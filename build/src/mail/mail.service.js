"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const HOST = process.env.SMTP_HOST || '';
const PORT = process.env.SMTP_HOST || '';
const USER = process.env.SMTP_USER || '';
const PASSWORD = process.env.SMTP_PASSWORD || '';
const CLIENT_URL = process.env.CLIENT_URL ? process.env.CLIENT_URL : 'http://localhost:3000';
class MailService {
    constructor() {
        this.transporter = nodemailer_1.default.createTransport({
            // @ts-ignore
            host: HOST,
            port: PORT,
            secure: true,
            auth: {
                user: USER,
                pass: PASSWORD
            }
        });
    }
    sendMail(to, link) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
                from: USER,
                to: to,
                subject: 'Активация аккаунта на сайте' + CLIENT_URL,
                text: '',
                html: `
               <div>
                    <h1>Активация аккаунта</h1>
                    <p>перейдите по ссылке</p>
                        <a href=${link}>${link}</a>
               </div>
            `
            });
        });
    }
}
exports.default = new MailService();
