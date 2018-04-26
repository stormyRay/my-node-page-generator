
//TODO: eventually create a base class for services
//base class functions:
//1. cache rowdefs
import * as _ from 'lodash';
import { Injectable, Inject, Component } from '@angular/core';
import { ResultSet, RowDef } from '../models/metadata.model';
import { DBActions } from '../models/dbaction.model';
import { Entity } from '../models/entity.model';
import { [[entity name]] } from '../models/[[import path]].model';
import { WithholdingTax } from '../models/withholding-tax.model';
import { ApxTransporter } from '../transporters/apx-transporter';
import { Observable } from 'rxjs/Observable';
import { ApxUtility } from '../common/apx-utility';
import { EntityServiceBase } from './entity-service-base.service';

@Injectable()
export class [[entity name]]Service extends EntityServiceBase {
    constructor(_transporter: ApxTransporter) {
        super(_transporter);
    }

    create[[entity name]]([[variable name]]: [[entity name]]): Observable < ResultSet < [[entity name]] >> {
        [[variable name]]._Action = DBActions.Insert;
        let result: any = this._transporter.saveData([[entity name]], [[[variable name]]]);
        console.log("Tranportation result:");
        console.log(result);

        return result;
    }

    update[[entity name]](original[[entity name]]: [[entity name]], edited[[entity name]]: [[entity name]]): Observable < ResultSet < [[entity name]] >> {
        if(ApxUtility.shallowEqual(original[[entity name]], edited[[entity name]])) {
            edited[[entity name]]._Action = DBActions.None;
        }
            else {
            edited[[entity name]]._Action = DBActions.Update;
        }
        return this._transporter.saveData([[entity name]], [edited[[entity name]]]);
    }

    delete[[entity name]]([[variable name]]: [[entity name]]): Observable < any > {
        [[variable name]]._Action = DBActions.Delete;
        return this._transporter.saveData([[entity name]], [[[variable name]]]);
    }
}
