import mongoose from "mongoose";

// An interface that describes the properties required to create a new Ticket.
interface TicketAttrs {
    title: string;
    price: number;
    userId: string;
}

// An interface that describes the properties that a Ticket Model has.
interface TicketModel extends mongoose.Model<TicketDoc> {
    build(attrs: TicketAttrs): TicketDoc;
}

// An interface that describes the properties that a Ticket Document has.
interface TicketDoc extends mongoose.Document {
    title: string;
    price: number;
    userId: string;
}

// Define the model and data elements.
const ticketSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true
    }
}, {
    // Define what we want to convert and return in the JSON response.
    toJSON: {
        transform(doc, ret) {
            // Remap the _id value from Mongoose to id.
            ret.id = ret._id;
            // Remove the _id property from displaying in the JSON response.
            delete ret._id;
            // Remove the version property from displaying in the JSON response.
            delete ret.__v;
        }
    }
});

// Function used to create a new Ticket wth typescript instead of using new function.
// Required only for Mongoose.
// Statics adds the function to the ticketSchema model.
ticketSchema.statics.build = (attrs: TicketAttrs) => {
    return new Ticket(attrs);
};

// Define the ticket based on the table.
const Ticket = mongoose.model<TicketDoc, TicketModel>('Ticket', ticketSchema);

// Make the ticket available for use.
export { Ticket };