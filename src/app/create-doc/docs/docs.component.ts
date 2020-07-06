import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { startWith } from 'rxjs/operators';
import { DocsService } from '../../services/docs.service';
import { Docs } from '../../models/docs';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-docs',
  templateUrl: './docs.component.html',
  styleUrls: ['./docs.component.scss'],
})
export class DocsComponent implements OnInit, OnDestroy {
  currentUserName: Observable<string>;
  userName;
  document: Docs;
  private _docSubscribe: Subscription;
  private _lastUserChangeSubscribe: Subscription;

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
    this.currentUserName = this.docsService.currentUserName;
    this._lastUserChangeSubscribe = this.docsService.currentUserName.subscribe(
      (userName) => (this.userName = userName)
    );
  }

  ngOnDestroy() {
    this._docSubscribe.unsubscribe();
    this._lastUserChangeSubscribe.unsubscribe();
  }

  editDoc() {
    this.docsService.editDoc(this.document);
    this._getuser();
  }

  private _getuser() {
    let token = sessionStorage.getItem('token');
    let decoded = jwt_decode(token);

    this.docsService.lastUserChange(decoded.data.name);
  }
}
