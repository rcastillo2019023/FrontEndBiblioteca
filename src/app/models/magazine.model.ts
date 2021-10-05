export class Magazine{
    constructor(
      public _id: String,
      public author: String,
      public title: String,
      public edition: Number,
      public description: String,
      public frequency: String,
      public exemplar: Number,
      public topics:[{}],
      public keywords:[{}],
      public copy: Number,
      public available: Number,
      public record: Number,
      public search: Number,
    ){}
  }