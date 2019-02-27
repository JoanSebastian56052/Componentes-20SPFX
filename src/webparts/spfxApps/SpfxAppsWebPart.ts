import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import * as strings from 'SpfxAppsWebPartStrings';
import SpfxApps from './components/SpfxApps';
import { ISpfxAppsProps } from './components/ISpfxAppsProps';

export interface ISpfxAppsWebPartProps {
  description: string;
}

export default class SpfxAppsWebPart extends BaseClientSideWebPart<ISpfxAppsWebPartProps> {

  public render(): void {
    const element: React.ReactElement<ISpfxAppsProps > = React.createElement(
      SpfxApps,
      {
        description: this.properties.description,
        context: this.context,
        firstItemSelect: "0"
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
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
