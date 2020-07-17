import {inject} from '@loopback/core';
import {juggler} from '@loopback/repository';

const configg = {
  name: 'ds',
  connector: 'memory',
  localStorage: '',
  file: './data/ds.json'
};

export class DsDataSource extends juggler.DataSource {
  static dataSourceName = 'ds';
  static readonly defaultConfig = configg;

  constructor(
    @inject('datasources.config.ds', {optional: true})
    dsConfig: object = configg) {
    super(dsConfig);
  }

}
