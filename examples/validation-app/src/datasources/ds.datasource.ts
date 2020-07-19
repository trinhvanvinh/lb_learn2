import { juggler } from '@loopback/repository';
import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';

const config = {
    name: 'ds',
    connector: 'memory',
    localStorage: '',
    file: ''
};

@lifeCycleObserver('datasource')
export class DsDataSource extends juggler.DataSource
implements LifeCycleObserver{

    static dataSourceName = 'ds';
    static readonly defaultConfig = config;

    constructor(
        @inject('datasources.config.ds', {optional: true})
        dsConfig: object = config,
    ){
        super(dsConfig);
    }
}