"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const users_1 = __importDefault(require("./routes/users"));
const books_1 = __importDefault(require("./routes/books"));
const app = (0, express_1.default)();
dotenv_1.default.config();
//middleware: It checks things coming from the backend befor it goes to the front end
app.use((0, morgan_1.default)('dev')); //send logs in the terminal in a way the developer will understand
app.use(express_1.default.json()); //It changes the json format of frontend data and converts them to a json file
app.use(express_1.default.urlencoded({ extended: false })); //data coming from a form is encoded, stored in a url and transfers it to the backend. This is responsible for decoding te data
app.use((0, cookie_parser_1.default)()); //What does it do??????
// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/', indexRouter);
app.use('/users', users_1.default);
app.use('/book', books_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
module.exports = app;
