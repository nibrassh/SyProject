import mongoose from 'mongoose';


const centerSchema = new mongoose.Schema({
    name: {
        en: { type: String,required: true },
        ar: { type: String,required: true }
    },
    address: {
        en: String,
        ar: String
    },
    image: {
        type: String,
    },
    shortdescription: {
        en: String,
        ar: String
    },
    longdescription: {
        en: String,
        ar: String
    },
    location: {
        type: [Number],
        required: true,
        index: '2dsphere'
    },
    request: {
        type: String,
        enum: ["free","reverc","agree"],
        default: "free"
    },
    branchId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Branch',
        required: true,
        index: true
    },
     companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        index: true
    }
},{timestamps: true });

centerSchema.index({ branchId: 1,request: 1 }); // Compound index


const Center = mongoose.model('Center',centerSchema);
export default Center;