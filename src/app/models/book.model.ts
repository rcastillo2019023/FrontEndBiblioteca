export class Book{
    constructor(
      public _id: String,
      public author: String,
      public title: String,
      public edition: Number,
      public keywords:[{}],
      public description: String,
      public topics:[{}],
      public copy: Number,
      public available: Number,
      public record: Number,
      public search: Number,
    ){}
  }