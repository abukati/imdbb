"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
let AppService = class AppService {
    async searchMovies(query) {
        if (query === undefined) {
            throw new common_1.BadRequestException();
        }
        try {
            const response = await fetch(`https://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&s=${query}`);
            const { Response, Search } = (await response.json());
            const isResponseOk = JSON.parse(Response.toLowerCase());
            if (!isResponseOk) {
                throw new common_1.NotFoundException();
            }
            const movies = Search;
            if (movies.length > 0) {
                return {
                    status: 200,
                    data: movies,
                };
            }
            throw new common_1.NotFoundException();
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
            const { Response, ...movie } = (await response.json());
            const isResponseOk = JSON.parse(Response.toLowerCase());
            if (!isResponseOk) {
                throw new common_1.NotFoundException();
            }
            return {
                status: 200,
                data: movie,
            };
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
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)()
], AppService);
//# sourceMappingURL=app.service.js.map