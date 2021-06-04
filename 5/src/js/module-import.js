import {
    myFunction1,
    myFunction2,
    exportedVarExample,
   // notExportedVarExample,
} from "./module-export-one-at-time.js";
// generalmente sconsigliato l'*
import * as OnceForAll from "./module-export-once-for-all.js";
import { myFunction1 as doubleMyFunction1 } from "./module-export-one-at-time.js";


myFunction1();
myFunction2();
console.log(exportedVarExample);

OnceForAll.myFunctionA();
OnceForAll.myFunctionB();

doubleMyFunction1();
