import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField,
  PropertyPaneDropdown
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';


import PopUpWindow from './components/PopUpWindow';
import { IPopUpWindowProps } from './components/IPopUpWindowProps';

export interface IPopUpWindowWebPartProps {
  title: string;
  url: string;
  align: string;
}

export default class PopUpWindowWebPart extends BaseClientSideWebPart <IPopUpWindowWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IPopUpWindowProps> = React.createElement(
      PopUpWindow,
      {
        title: this.properties.title,
        url: this.properties.url,
        align: this.properties.align
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: "Ajustes"
          },
          groups: [
            {
              groupName: "Ajustes del webpart",
              groupFields: [
                PropertyPaneTextField('title', {
                  label: "Titulo del documento"
                }),
                PropertyPaneTextField('url', {
                  label: "Link del documento"
                }),
                PropertyPaneDropdown("align",{
                  label:'Alineacion del boton',
                  options: [
                    { key: 'left', text: 'Izquierda' },
                    { key: 'right', text: 'Derecha' },
                    { key: 'center', text: 'Centro' }
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
