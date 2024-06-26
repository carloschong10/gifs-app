import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  template: `
    <h5>Buscar:</h5>
    <input type="text" 
      class="form-control" 
      placeholder="Buscar gifs..."
      (keyup.enter)="searchTag()"
      #txtTagInput
    >
    <!-- (keyup.enter)="searchTag(txtTagInput.value)" -->
  `
})
export class SearchBoxComponent {

  @ViewChild('txtTagInput') //hace referencia a una referencia local del html
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifsService: GifsService) { }

  // searchTag(newTag: string) { //ya no es necesario enviarlo por parametro ya que lo estamos enlazando a través del ViewChield tagInput
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    // console.log({newTag});

    this.gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }

}
