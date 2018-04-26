/**
 * Store the mapping between the markings in the existed files and the inserted lines (templates)
 */ 
var filesToBeModified = [
    {
        file: "/pages/pages.module.ts",
        changes: [
            {
                mark: "code-generator-page-module-1",
                template: "import { SecInfo[[entity name]]PageService } from './[[folder name]]/sec-info-[[file name]].page.service';"
            }, {
                mark: "code-generator-page-module-2",
                template: "\t\tSecInfo[[entity name]]PageService,"
            }
        ]
    }, {
        file: "/reducers/index.ts",
        changes: [
            {
                mark: "code-generator-reducer-1",
                template: "import * as secInfo[[entity name]] from '../pages/[[folder name]]/sec-info-[[file name]].reducers';"
            }, {
                mark: "code-generator-reducer-2",
                template: "\tsecInfo[[entity name]]: secInfo[[entity name]].State;"
            }, {
                mark: "code-generator-reducer-3",
                template: "\tsecInfo[[entity name]]: secInfo[[entity name]].reducer,"
            }, {
                mark: "code-generator-reducer-4",
                template: "\t\tsecInfo[[entity name]]: secInfo[[entity name]].initialState,"
            }
        ]
    }, {
        file: "/ui-engine/pages.ts",
        changes: [
            {
                mark: "code-generator-ui-engine-pages-1",
                template: 
                `import { SecInfo[[entity name]]DetailHandler } from '../pages/[[folder name]]/sec-info-[[file name]]-detail.handler';
import { SecInfo[[entity name]]Handler } from '../pages/[[folder name]]/sec-info-[[file name]].handler';`
            }, {
                mark: "code-generator-ui-engine-pages-2",
                template: //keep the indent!!
`
function [[variable name]]StateSelector(root: State): any {
    return root.ui.secInfo[[entity name]];
}`
            }, {
                mark: "code-generator-ui-engine-pages-3",
                template: //keep the indent!!
    `
    "SecInfo[[entity name]]Handler": {
        handler: SecInfo[[entity name]]Handler,
        stateName: [[variable name]]StateSelector
    },
    "SecInfo[[entity name]]DetailHandler": {
        handler: SecInfo[[entity name]]DetailHandler,
        stateName: [[variable name]]StateSelector
    },`
            }
        ]
    }, {
        file: "/ui-engine/ui-engine.module.ts",
        changes: [
            {
                mark: "code-generator-ui-engine-modules-1",
                template: "import { [[entity name]]Service } from '../services/[[file name]].service';"
            }, {
                mark: "code-generator-ui-engine-modules-2",
                template: "\t\t[[entity name]]Service,"
            }
        ]
    }
];

module.exports = filesToBeModified;