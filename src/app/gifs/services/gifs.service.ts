import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({ providedIn: 'root' })
export class GifsService {

    private _tagsHistory: string[] = [];
    private apiKey: string = 'mBsRuvAcC5VKTaxHPveTp09PfU3pBrE5';
    private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
    public gifList: Gif[] = [];

    constructor(private http: HttpClient) { }

    get tagsHistory() {
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string) {
        tag = tag.toLowerCase().trim();
        this._tagsHistory = this._tagsHistory.filter(oldTag => oldTag !== tag);
        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0, 10);

        this.saveLocalStorage();
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this.tagsHistory));
    }

    // async searchTag(tag: string): Promise<void> {
    searchTag(tag: string): void {
        if (tag.length === 0) return;
        this.organizeHistory(tag);

        // esta seria una peticion comun con javascript a traves del api fetch
        /*
        const resp = await fetch('https://api.giphy.com/v1/gifs/search?api_key=mBsRuvAcC5VKTaxHPveTp09PfU3pBrE5&q=valorant&limit=10');
        const data = await resp.json();
        console.log(data);
        */

        //pero en angular se usa mejor los Observables
        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', '10')
            .set('q', tag);

        this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
            .subscribe(resp => {
                this.gifList = resp.data;
                // console.log({ gifs: this.gifList })
            })
    }

}