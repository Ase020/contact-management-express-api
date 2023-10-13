import { Schema, model } from "mongoose";

const ContactSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email"],
    },
    phone_number: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    timestamps: true,
  }
);

const ContactModel = model("Contact", ContactSchema);

export default ContactModel;
