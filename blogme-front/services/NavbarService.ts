import { observable, action, makeAutoObservable } from "mobx";
import { useState } from "react";
import { ISearchOption } from "../interfaces/INavbar"

// const [searchValue, setSearchValue] = useState("default")
export class NavbarService {

  constructor() {
    makeAutoObservable(this)
  }

  @observable
  public option: ISearchOption[] = [
    {
      label: "optioin1",
      value: "option1",
    },
    {
      label: "optioin2",
      value: "option2",
    },
  ];

  @observable
  public searchValue: string = "";

  @observable
  public searchOptions: ISearchOption[] = [
    {
      label: "optioin1",
      value: "option1",
    },
    {
      label: "optioin2",
      value: "option2",
    },
  ];

  @action
  public setSearchValue(value: string) {
    this.searchValue = value;
  }

  @action
  public setSearchOptions(options: any) {
    this.searchOptions = options;
  }
}

