import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {HttpClient} from "@angular/common/http";

//#region Factory implementation

/*
* Use http loader factory.
* */
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

//#endregion
