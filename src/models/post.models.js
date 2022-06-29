const { Schema, model } = require("mongoose");
const { marked } = require("marked");
const slugify = require("slugify");
const createDomPurify = require("dompurify");
const { JSDOM } = require("jsdom");
const dompurify = createDomPurify(new JSDOM().window);

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  markdowon: {
    type: String,
    required: true,
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  sanitizedHtml: {
    type: String,
    required: true,
  },
});

postSchema.pre("validate", function (next) {
  if (this.tile) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  if (this.markdowon) {
    this.sanitizedHtml = dompurify.sanitize(marked(this.markdowon));
  }
  next();
});

const Post = model("Post", postSchema);
module.exports = Post;
