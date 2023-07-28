import mongoose from 'mongoose';

const EventFieldsSchema = {
    type: mongoose.Schema.Types.String,
    trim: true,
    required: true,
}

const eventSchema = new mongoose.Schema({
    chain: EventFieldsSchema,
}, { timestamps: true, strict: false });

export default mongoose.model('Events', eventSchema);