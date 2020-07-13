import { juggler } from '@loopback/repository';
import { inject } from '@loopback/core';

const config = {
    name: 'db',
    connector: 'memory',
    localStorage: '',
    file: './data/db.json'
};

export class DbDataSource extends juggler.DataSource{
    static dataSourceName = 'db';
    static readonly defaultConfig = config;

    constructor(
        @inject('datasource.config.db', {optional: true})
        dsConfig: object = config,
    ){
        super(dsConfig);
    }

}

