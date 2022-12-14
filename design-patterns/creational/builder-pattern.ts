/*
There is a very good library for using builder pattern ->
https://github.com/Vincent-Pang/builder-pattern

 */

class User {
  constructor(
    public username: string,
    public sex: string,
    public age: number,
    public photo: string,
    public email: string
  ) {}
}

class UserBuilder {
  private username!: string;
  private sex!: "male" | "female";
  private age!: number;
  private photo!: string;
  private email!: string;

  setUserName(username: string): UserBuilder {
    this.username = username;
    return this;
  }

  setSex(sex: "male" | "female"): UserBuilder {
    this.sex = sex;
    return this;
  }

  setAge(age: number): UserBuilder {
    this.age = age;
    return this;
  }

  setPhoto(photo: string): UserBuilder {
    this.photo = photo;
    return this;
  }

  setEmail(email: string): UserBuilder {
    this.email = email;
    return this;
  }

  build(): User {
    return new User(this.username, this.sex, this.age, this.photo, this.email);
  }
}

/**
 * Usage
 */

const user: User = new UserBuilder()
  .setUserName("Adam Kowalski")
  .setSex("male")
  .setAge(21)
  .setPhoto("/thumb.png")
  .setEmail("adm.kski@gmail.com")
  .build();

console.log({ user });
