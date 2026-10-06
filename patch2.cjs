const fs = require('fs');
let file = fs.readFileSync('src/pages/Experience/ExperiencePage.jsx', 'utf8');

const replacementArray = 'const EARLIER_RECORDS = [\n' +
'  {\n' +
'    id: \'retail-2022\',\n' +
'    num: \'03\',\n' +
'    org: \'India International Trade Fair\',\n' +
'    role: \'Retail Sales Lead\',\n' +
'    year: \'2022\',\n' +
'    period: \'November 2022\',\n' +
'    location: \'Pragati Maidan, New Delhi\',\n' +
'    context: \'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.\',\n' +
'    metrics: [\n' +
'      { value: \'₹3.10L\', label: \'SALES\' },\n' +
'      { value: \'14\', label: \'DAYS\' }\n' +
'    ],\n' +
'    contributions: null,\n' +
'    isActive: false,\n' +
'  },\n' +
'  {\n' +
'    id: \'merchandiser-2022\',\n' +
'    num: \'04\',\n' +
'    org: \'1 Artifact Decor\',\n' +
'    role: \'Merchandiser\',\n' +
'    year: \'2022\',\n' +
'    period: \'October 2022\',\n' +
'    location: \'Greater Noida, Uttar Pradesh, India\',\n' +
'    context: \'Represented 1 Artifact DAccor at the IHGF Delhi Fair, handling international client enquiries and coordinating product requirements between two exhibition stalls.\',\n' +
'    contributions: null,\n' +
'    isActive: false,\n' +
'  },\n' +
'  {\n' +
'    id: \'retail-2021\',\n' +
'    num: \'05\',\n' +
'    org: \'India International Trade Fair\',\n' +
'    role: \'Retail Sales Lead\',\n' +
'    year: \'2021\',\n' +
'    period: \'November 2021\',\n' +
'    location: \'Pragati Maidan, New Delhi\',\n' +
'    context: \'Led an assigned trade-fair stall, managing product selection, pricing, negotiation, and promotional offers.\',\n' +
'    metrics: [\n' +
'      { value: \'₹2.97L\', label: \'SALES\' },\n' +
'      { value: \'14\', label: \'DAYS\' }\n' +
'    ],\n' +
'    contributions: null,\n' +
'    isActive: false,\n' +
'  },\n' +
'];';

file = file.replace(/const EARLIER_RECORDS = \[[\s\S]*?\];/, replacementArray);

const searchJSX = '<p className="exp-record-context">{record.context}</p>';
const replaceJSX = '<p className="exp-record-context">{record.context}</p>\n' +
'            {record.metrics && record.metrics.length > 0 && (\n' +
'              <div className="exp-entry-metrics">\n' +
'                {record.metrics.map((metric, i) => (\n' +
'                  <div className="exp-metric" key={i}>\n' +
'                    <span className="exp-metric-val">{metric.value}</span>\n' +
'                    <span className="exp-metric-label">{metric.label}</span>\n' +
'                  </div>\n' +
'                ))}\n' +
'              </div>\n' +
'            )}';

file = file.replace(searchJSX, replaceJSX);
fs.writeFileSync('src/pages/Experience/ExperiencePage.jsx', file);
console.log("Patched successfully!");
