import Contact from "../models/contacts.models.js"
import mongoose from "mongoose"

//////////////////////////////////////////////////////////////
// 📌 Get All Contacts
export const getContacts = async (req, res, next) => {
    try {
        const { page = 1, limit = 5} = req.query;

        const options ={
            page: parseInt(page),
            limit : parseInt(limit)
        }
      //  const contacts = await Contact.find()
      const result = await Contact.paginate({},options)
    //  res.send(result)

      res.render('home', {
        totalDocs: result.totalDocs,
        limit: result.limit,
        totalPages: result.totalPages,
        page: result.page,
        pagingCounter: result.pagingCounter,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        contacts: result.docs
 
        })
      
    } catch (err) {
        next(res.render('500', { message: err.message }))
    }
}

//////////////////////////////////////////////////////////////
// 📌 Get Single Contact
export const getContact = async (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
        return res.status(404).render('404', { message: "Invalid Id" })
    }
    try {
        let paramId = mongoose.Types.ObjectId.isValid(req.params.id) // validation for id
        if (!paramId) {
            return res.status(404).render('404', { message: "Invalid Id" })
        }

        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).render('404', { message: "Contact not found" })
        }

        res.render('show-contact', { contact })
    } catch (err) {
        next(err)
    }
}

//////////////////////////////////////////////////////////////
// 📌 Add Contact Page
export const addContactPage = (req, res) => {
    res.render('add-contact')
}

//////////////////////////////////////////////////////////////
// 📌 Add New Contact
export const addContact = async (req, res, next) => {
    try {
       const contact = await Contact.create(req.body)
        res.redirect("/")
    } catch (err) {
        next(res.render('500',{message: error}))
    }
}

//////////////////////////////////////////////////////////////
// 📌 Update Contact Page
export const updatedContactPage = async (req, res, next) => {

        if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).render('404', { message: "Invalid Id" })
        }    
    try {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            return res.status(404).render('404', { message: "Contact not found" })
        }
        res.render('update-contact', { contact })
    } catch (err) {
        next(err)
    }
}

//////////////////////////////////////////////////////////////
// 📌 Update Contact
export const updateContact = async (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).render('404', { message: "Invalid Id" })
        } 
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body)
        res.redirect("/")
    } catch (err) {
        next(err)
    }
}

//////////////////////////////////////////////////////////////
// 📌 Delete Contact
export const deleteContact = async (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
            return res.status(404).render('404', { message: "Invalid Id" })
        } 
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        res.redirect("/")
    } catch (err) {
        next(err)
    }
}
