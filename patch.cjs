const fs = require('fs');
let file = fs.readFileSync('src/pages/Experience/index.jsx', 'utf8');

const replacementArray = 'const EARLIER_ENTRIES = [\n' +
'  {\n' +
'    id: \'retail-2022\',\n' +
'    num: \'03\',\n' +
'    year: \'2022\',\n' +
'    period: \'November 2022\',\n' +
'    org: \'India International Trade Fair\',\n' +
'    role: \'Retail Sales Lead\',\n' +
'    location: \'Pragati Maidan, New Delhi\',\n' +
'    context: \'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.\',\n' +
'    metrics: [\n' +
'      { value: \'₹3.10L\', label: \'SALES\' },\n' +
'      { value: \'14\', label: \'DAYS\' }\n' +
'    ]\n' +
'  },\n' +
'  {\n' +
'    id: \'merchandiser-2022\',\n' +
'    num: \'04\',\n' +
'    year: \'2022\',\n' +
'    period: \'October 2022\',\n' +
'    org: \'1 Artifact Decor\',\n' +
'    role: \'Merchandiser\',\n' +
'    location: \'Greater Noida, Uttar Pradesh, India\',\n' +
'    context: \'Represented 1 Artifact DAccor at the IHGF Delhi Fair, handling international client enquiries and coordinating product requirements between two exhibition stalls.\',\n' +
'  },\n' +
'  {\n' +
'    id: \'retail-2021\',\n' +
'    num: \'05\',\n' +
'    year: \'2021\',\n' +
'    period: \'November 2021\',\n' +
'    org: \'India International Trade Fair\',\n' +
'    role: \'Retail Sales Lead\',\n' +
'    location: \'Pragati Maidan, New Delhi\',\n' +
'    context: \'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.\',\n' +
'    metrics: [\n' +
'      { value: \'₹2.97L\', label: \'SALES\' },\n' +
'      { value: \'14\', label: \'DAYS\' }\n' +
'    ]\n' +
'  },\n' +
'];';

file = file.replace(/const EARLIER_ENTRIES = \[[\s\S]*?\];/, replacementArray);

const searchJSX = '<p className="exp-entry-context">{e.context}</p>\n                </div>';
const replaceJSX = '<p className="exp-entry-context">{e.context}</p>\n' +
'                  {e.metrics && e.metrics.length > 0 && (\n' +
'                    <div className="exp-entry-metrics">\n' +
'                      {e.metrics.map((metric, i) => (\n' +
'                        <div className="exp-metric" key={i}>\n' +
'                          <span className="exp-metric-val">{metric.value}</span>\n' +
'                          <span className="exp-metric-label">{metric.label}</span>\n' +
'                        </div>\n' +
'                      ))}\n' +
'                    </div>\n' +
'                  )}\n' +
'                </div>';

if(file.includes(searchJSX)) {
  file = file.replace(searchJSX, replaceJSX);
} else {
  // Try regex in case of carriage returns
  file = file.replace(/<p className=\"exp-entry-context\">\{e\.context\}<\/p>\s*<\/div>/, replaceJSX);
}
fs.writeFileSync('src/pages/Experience/index.jsx', file);
console.log("Patched successfully!");
