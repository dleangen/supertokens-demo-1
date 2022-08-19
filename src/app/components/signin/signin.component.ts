import { Component, OnDestroy, AfterViewInit } from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import SuperTokensUI from "./supertokens-ui";
import * as React from "react";
import * as ReactDOM from "react-dom"

@Component({
  selector: "app-signin",
  template: '<div [id]="rootId"></div>',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  ],
})
export class SignInComponent implements OnDestroy, AfterViewInit {

  public rootId = "rootId";

  ngAfterViewInit() {
    ReactDOM.render(React.createElement(SuperTokensUI), document.getElementById(this.rootId));
  }

  ngOnDestroy() {
    ReactDOM.unmountComponentAtNode(document.getElementById(this.rootId) as Element);
  }
}
