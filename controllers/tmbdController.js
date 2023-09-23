const axios = require('axios');
require('dotenv').config();
const BEARER_TOKEN = 'Bearer '+ process.env.TOKEN_TMBD;
const COMMON_HEADERS_DEFAULTS = {
    headers:{Authorization:BEARER_TOKEN},
    params:{
        language:"es-CO",
    }
}
let imagesConfiguration=null;

const axiosForConfiguration = axios.create({
    baseURL: 'https://api.themoviedb.org/3/configuration',
    ...COMMON_HEADERS_DEFAULTS
});

const axiosTMBD = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    ...COMMON_HEADERS_DEFAULTS
});


const URL_SEARCH_MOVIE = "search/movie";
const URL_SEARCH_SERIE = "search/tv";
const URL_DETAIL_MOVIE = "movie/";
const URL_DETAIL_SERIE = "tv/";
const CONFIGURATION = "configuration"

function searchMovie(req,res,next) {searchMedia(req,res,next,URL_SEARCH_MOVIE);}
function searchSerie(req,res,next) {searchMedia(req,res,next,URL_SEARCH_SERIE);}
function detailMovieById(req,res,next) {detailMediaById(req,res,next,URL_DETAIL_MOVIE);}
function detailSerieById(req,res,next) {detailMediaById(req,res,next,URL_DETAIL_SERIE);}


async function searchMedia(req,res,next,mediaType){
    if(!req.params.nombre) return res.status(400).json({msg:"sin query"});

    axiosTMBD.get(mediaType,{
        params:{
            query: req.params.nombre,
            include_adult:'false',
            page:req.query.page || 1
        }   
    }).then((result) => {
        if(!result.data.total_results){
            res.sendStatus(204);
        }
        res.json(result.data)
    }).catch((err) => {
        return res.status(500).json(err)
    });
}

async function getImagesConfiguration(extra){
    await axiosForConfiguration.get(extra).then((result) => {
        imagesConfiguration = result.data.images;
    }).catch((err) => {
        imagesConfiguration=null;
        console.log("No se pudo obtener la configuración de imagenes");
    });
}

async function getImage(req,res,next){
    if(imagesConfiguration == null){
        await getImagesConfiguration("");
        if(imagesConfiguration == null){
            res.status(500).json({msg:"No se pudo obtener la configuración de las imagenes"})
        }
    }
    if(!req.params.uri) return res.status(400).json({msg:"sin URI"});
    if(!req.params.size) return res.status(400).json({msg:"sin tamaño definido"});

    const fullURL = `${req.params.size}/${req.params.uri}`;

    axios.get(imagesConfiguration.base_url+fullURL, {responseType: 'arraybuffer'}).then((result) => {
        res.type(result.headers["content-type"]);
        res.append('Content-Length', result.data.length);
        return res.send(result.data)

    }).catch((err) => {
        if(err.response.status === 404) res.status(404).json({msg:"No se encontro la imagen"})
        return res.status(500).json({msg:err})
    });
}

async function detailMediaById(req,res,next,url){
    if(!req.params.id) return res.status(400).json({msg:"sin id"});

    if(parseInt(req.params.id) === NaN) return res.status(400).json({msg:"la id no es un numero"});

    await axiosTMBD.get(url+req.params.id).then(async (result) => {
        if(url===URL_DETAIL_MOVIE){
            return res.status(200).json( await cleanDetailMedia(result.data,true))
        }
        return res.status(200).json(await cleanDetailMedia(result.data,false))
    }).catch((err) => {
        if(err.response.status === 404) return res.status(404).json({msg:"No se encontro la id"})
        return res.status(500).json(err)
    });
}

async function cleanDetailMedia(media,isAMovie){
    let cleanMedia = {};
    cleanMedia["id"] = media.id;

    if(isAMovie){
        cleanMedia["original_title"] = media.original_title;
        cleanMedia["title"] = media.title;
        cleanMedia["release_date"] = media.release_date;
        cleanMedia["director"] = await getDirector(media.id,URL_DETAIL_MOVIE);
    }else{
        cleanMedia["original_title"] = media.original_name;
        cleanMedia["title"] = media.name;
        cleanMedia["release_date"] = media.first_air_date;
        cleanMedia["director"] = media.created_by;
    }
    cleanMedia["genres"] = media.genres;
    cleanMedia["overview"] = media.overview;
    cleanMedia["poster_path"] = media.poster_path;
    cleanMedia["production_companies"] = media.production_companies;
    

    return cleanMedia;
}

async function getDirector(Id,url){
    let director = "Not Found";

    await axiosTMBD.get(`${url}${Id}/credits`).then((result) =>{
        let crew = result.data.crew;
        resultFound = crew.find((crew) => crew.job === "Director")
        console.log(resultFound);
        if(resultFound) director = {id: resultFound.id,name:resultFound.name};
    });

    return director;
}




const { Router } = require('express')
const router = Router()

router.get('/movie/:nombre', searchMovie);
router.get('/serie/:nombre', searchSerie);
router.get('/movie/id/:id', detailMovieById);
router.get('/serie/id/:id', detailSerieById);
router.get('/images/:size/:uri', getImage);

module.exports = router;