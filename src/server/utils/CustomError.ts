class CustomError extends Error {
  constructor(message: string, name: string) {
    super(message);
    this.name = name;
    console.log("=============================");
    console.log(this.name);
    console.log(this.message);
    console.log("=============================");
  }
}

export default CustomError;
