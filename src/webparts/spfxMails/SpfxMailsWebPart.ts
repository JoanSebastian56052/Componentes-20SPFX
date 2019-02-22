import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';

import { MSGraphClient } from '@microsoft/sp-http';

import * as strings from 'SpfxMailsWebPartStrings';
import SpfxMails from './components/SpfxMails';
import { ISpfxMailsProps } from './components/ISpfxMailsProps';
import SpfxApps from '../spfxApps/components/SpfxApps';

export interface ISpfxMailsWebPartProps {
  description: string;
}

export default class SpfxMailsWebPart extends BaseClientSideWebPart<ISpfxMailsWebPartProps> {

  public render(): void {
    this.context.msGraphClientFactory.getClient()
      .then((client: MSGraphClient): void => {
        const element: React.ReactElement<ISpfxMailsProps > = React.createElement(
          SpfxMails,
          {
            graphClient: client
          }
        );
        ReactDom.render(element, this.domElement);
      })
    
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
