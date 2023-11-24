import {Router} from 'express'

import packagejson from '../../package.json'


export const baseRoutes = Router()


baseRoutes.get( '/',(_, res) =>{

    const { name, version, description, author} = packagejson

    res.status(200).json({ name, version, description, author})


} )