  export class User{
    constructor(
      public _id: String,
      public id:String,
      public name: String,
      public lastName: String,
      public user: String,
      public email: String,
      public password: String,
      public role: String,
      public loan:[{
       _id:String,
       state:String,
       idBook:String
      }],
      public record: Number,
      public lend: Number,
    ){}
  }
  