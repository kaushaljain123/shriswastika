const mongoose  = require("mongoose")
const slugify = require("slugify")

const categorySchema = mongoose.Schema({
    name: { 
        type: String, 
        required: true,
        trim: true
     },
     slug: {
         type: String,
         unique: true
     },
     parentId: {
         type: String
     }
},
    {
        timestamps: true
    }
)

// create Shop slug from the name
categorySchema.pre('save', function(next) {
    this.slug = slugify(this.name, { lower : true });
    next();
});

const Category = mongoose.model('Category', categorySchema)

module.exports = Category 