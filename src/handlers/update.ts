import prisma from "../../db";

// Get All

export const getUpdates = async (req, res) => {
    
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    console.log(updates, "Updates")

    res.json({data: updates})

  }


  // Get One

  export const getOneUpdate = async (req, res) => {
    const id = req.params.id
    const update = await prisma.update.findFirst(
        {
            where: {
                id,
            }
        }
    )
    res.json({data: update})
}


// Create Update

export const createUpdate = async (req, res) => {

    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) {
        return res.json({message: "The product you are trying to update doesn't exist"})
    }

    const update = await prisma.update.create({
        data: req.body
    })

    res.json({data: update})
 }


 // Update Update

 export const updateUpdate = async (req, res) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    console.log(products, "All products!!")
    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    
    const match = updates.find((update) => update.id === req.params.id)
    console.log(match, "This is the match!")
    
    if(!match) {
        return res.json({message: "Nope"})
    }

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        }, 
        data: req.body
    })
    res.json({data: updatedUpdate})
 }

 // Delete Update

 export const deleteUpdate = async (req, res) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])


    const match = updates.find((update) => update.id === req.params.id)

    if(!match) {
        return res.json({message: "Nope"})
    }

    const deleted = await prisma.update.delete({
        where: {
            id: req.params.id
        }
    })

    res.json({data: deleted})
}