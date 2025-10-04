import express from "express"
const router = express.Router()
import Contact from "../models/contacts.models.js"
import {
    getContacts,
    getContact,
    addContactPage,
    addContact,
    updatedContactPage,
    updateContact,
    deleteContact
} from "../controller/contact.controller.js"


router.get('/',getContacts)

router.get('/Show-Contact/:id',getContact)

router.get('/add-contact',addContactPage)

router.post('/add-contact',addContact)

router.get('/update-contact/:id', updatedContactPage)

router.post('/update-contact/:id',updateContact)

router.get('/delete-contact/:id',deleteContact)

export default router