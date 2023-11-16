"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AppService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const lowercaseJson_1 = require("./utils/lowercaseJson");
let AppService = AppService_1 = class AppService {
    constructor() {
        this.logger = new common_1.Logger(AppService_1.name);
    }
    async searchMovies(query) {
        if (query === undefined) {
            throw new common_1.BadRequestException();
        }
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
            const json = (await response.json());
            const { response: apiResponse, search: movies } = (0, lowercaseJson_1.lowercaseJsonKeys)(json);
            const isResponseOk = typeof apiResponse === 'boolean'
                ? apiResponse
                : JSON.parse(apiResponse.toLowerCase());
            if (!isResponseOk) {
                throw new common_1.NotFoundException();
            }
            if (movies.length > 0 && (movies)) {
                return {
                    status: 200,
                    data: movies,
                };
            }
            throw new common_1.InternalServerErrorException();
        }
        catch (error) {
            return {
                status: error.status,
                error: error.message,
            };
        }
    }
    async getMovie(id) {
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&i=${id}`);
            const json = (await response.json());
            const { response: apiResponse, ...movie } = (0, lowercaseJson_1.lowercaseJsonKeys)(json);
            const isResponseOk = typeof apiResponse === 'boolean'
                ? apiResponse
                : JSON.parse(apiResponse.toLowerCase());
            if (!isResponseOk) {
                throw new common_1.NotFoundException();
            }
            if (validateMovieProfile(movie)) {
                return {
                    status: 200,
                    data: movie,
                };
            }
            throw new common_1.InternalServerErrorException();
        }
        catch (error) {
            return {
                status: error.status,
                error: error.message,
            };
        }
    }
};
exports.AppService = AppService;
exports.AppService = AppService = AppService_1 = __decorate([
    (0, common_1.Injectable)()
], AppService);
function validateMovieProfile(obj) {
    return typeof obj === 'object' &&
        obj !== null &&
        (obj)
        ? true
        : false;
}
//# sourceMappingURL=app.service.js.map