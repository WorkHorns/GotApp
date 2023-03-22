export default class GotService {
    constructor(){
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);

        if(!res.ok) {
            throw new Error (`Could not fetch ${url}, received ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const allChars = await this.getResource(`/characters?page=6`);
        return allChars.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const char = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(char);
    }

    getAllHouses = async() => {
        const allHouses = await this.getResource(`/houses?page=6`);
        return allHouses.map(this._transformHouses);
    }

    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouses(house);
    }

    getAllBooks = async () => {
        const allBooks = await this.getResource(`/books`);
        return allBooks.map(this._transformBooks);
    }

    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBooks(book);
    }

    _isSet(data) {
        if(data){
            return data;
        } else {
            return 'Не известно'
        }
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)$/;
        return item.url.match(idRegExp)[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this._extractId(char),
            name: this._isSet(char.name),
            gender: this._isSet(char.gender),
            born: this._isSet(char.born),
            died: this._isSet(char.died),
            culture: this._isSet(char.culture)
        }
    }

    _transformHouses = (house) =>{
        return {
            id: this._extractId(house),
            name: this._isSet(house.name),
            region: this._isSet(house.region),
            words: this._isSet(house.words),
            titles: this._isSet(house.titles),
            overlord: this._isSet(house.overlord),
            ancestralWeapons: this._isSet(house.ancestralWeapons)
        }
    }

    _transformBooks(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publisher: book.publisher,
            released: book.released
        }
    }
}
    