import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DocsService } from '../../services/docs.service';
import { Docs } from '../../models/docs';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit, OnDestroy {
  document: Docs;
  private _docSubscribe: Subscription;

  constructor(private docsService: DocsService) {}

  ngOnInit(): void {
    this._docSubscribe = this.docsService.currentDoc
      .pipe(
        startWith({
          id: '',
          doc: 'Select or create a document',
          docPassword: '',
        })
      )
      .subscribe((document) => (this.document = document));
  }

  ngOnDestroy() {
    this._docSubscribe.unsubscribe();
  }

  editDoc() {
    this.docsService.editDoc(this.document);
  }
}
