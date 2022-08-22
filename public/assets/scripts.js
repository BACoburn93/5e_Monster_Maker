const form = document.querySelector('#monsterMaker');

const alert = document.querySelector('.alert');

const boldBtn = document.querySelector('#bold-btn');
const underlineBtn = document.querySelector('#underline-btn');
const italicBtn = document.querySelector('#italic-btn');
const colorBtn = document.querySelector('#color-btn');

const newBtn = document.querySelector('#new-btn');
const txtBtn = document.querySelector('#txt-btn');
const pdfBtn = document.querySelector('#pdf-btn');

const content = document.querySelector('#content');
const filename = document.querySelector('#filename-input');

const action = document.querySelector('#action');
const creatureAction = document.querySelector('#actionContent');

let isBoldActive = false;
let isUnderlineActive = false;
let isItalicActive = false;


const copyCreatureContent = () => {
    const specialTraitText = document.getElementById('special-traits');
    const specialTraitDiv = document.getElementById('specialTraitContent');
    const actionText = document.getElementById('action');
    const actionDiv = document.getElementById('actionContent');
    const bonusActionText = document.getElementById('bonus-action');
    const bonusActionDiv = document.getElementById('bonusActionContent');
    const reactionText = document.getElementById('reaction');
    const reactionDiv = document.getElementById('reactionContent');
    const legendaryActionText = document.getElementById('legendary-action');
    const legendaryActionDiv = document.getElementById('legendaryActionContent');
    const mythicActionText = document.getElementById('mythic-action');
    const mythicActionDiv = document.getElementById('mythicActionContent');
    const lairActionText = document.getElementById('lair-action');
    const lairActionDiv = document.getElementById('lairActionContent');

    specialTraitText.innerHTML = specialTraitDiv.innerHTML;
    actionText.innerHTML = actionDiv.innerHTML;
    bonusActionText.innerHTML = bonusActionDiv.innerHTML;
    reactionText.innerHTML = reactionDiv.innerHTML;
    legendaryActionText.innerHTML = legendaryActionDiv.innerHTML;
    mythicActionText.innerHTML = mythicActionDiv.innerHTML;
    lairActionText.innerHTML = lairActionDiv.innerHTML;
    return true;
}



form.addEventListener('click', (e) => {
    console.dir(e.target)
    console.log(e.target.value)
    console.log(e.target.name)
})

// Text Editor

const table = '<p>This table uses features of the non-editable plugin to make the text in the<br><strong>top row</strong> and <strong>left column</strong> uneditable.</p>' +
    '    <table style="width: 60%; border-collapse: collapse;" border="1"> ' +
    '        <caption class="mceNonEditable">Ephox Sales Analysis</caption> ' +
    '       <tbody> ' +
    '          <tr class="mceNonEditable"> ' +
    '                <th style="width: 40%;">&nbsp;</th><th style="width: 15%;">Q1</th> ' +
    '                <th style="width: 15%;">Q2</th><th style="width: 15%;">Q3</th> ' +
    '                <th style="width: 15%;">Q4</th> ' +
    '            </tr> ' +
    '            <tr> ' +
    '                <td class="mceNonEditable">East Region</td> ' +
    '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
    '            </tr> ' +
    '            <tr> ' +
    '                <td class="mceNonEditable">Central Region</td> ' +
    '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
    '            </tr> ' +
    '            <tr> ' +
    '                <td class="mceNonEditable">West Region</td> ' +
    '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
    '            </tr> ' +
    '        </tbody> ' +
    '    </table>';

const table2 = '<div> ' +
    '        <p>' +
    '            Templates are a great way to help content authors get started creating content.  You can define the HTML for the template and ' +
    '            then when the author inserts the template they have a great start towards creating content! ' +
    '        </p> ' +
    '        <p> ' +
    '            In this example we create a simple table for providing product details for a product page on your web site.  The headings are ' +
    '            made non-editable by loading the non-editable plugin and placing the correct class on the appropriate table cells. ' +
    '        </p> ' +
    '        <table style="width:90%; border-collapse: collapse;" border="1"> ' +
    '        <tbody> ' +
    '        <tr style="height: 30px;"> ' +
    '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Name:</td><td style="width:60%;">{insert name here}</td> ' +
    '        </tr> ' +
    '        <tr style="height: 30px;"> ' +
    '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Description:</td><td style="width:60%;">{insert description here}</td> ' +
    '        </tr> ' +
    '        <tr style="height: 30px;"> ' +
    '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Price:</td><td style="width:60%;">{insert price here}</td> ' +
    '        </tr> ' +
    '        </tbody> ' +
    '        </table> ' +
    '    </div> ';

const demoBaseConfig = {
    selector: 'textarea.classic',
    // width: 755,
    // height: 500,
    resize: true,
    autosave_ask_before_unload: false,
    powerpaste_allow_local_images: true,
    plugins: [
        'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
        'image', 'editimage', 'tinydrive', 'lists', 'link', 'media', 'powerpaste', 'preview',
        'searchreplace', 'table', 'template', 'tinymcespellchecker', 'visualblocks', 'wordcount'
    ],
    templates: [
        {
            title: 'Non-editable Example',
            description: 'Non-editable example.',
            content: table
        },
        {
            title: 'Simple Table Example',
            description: 'Simple Table example.',
            content: table2
        }
    ],
    toolbar: 'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
    spellchecker_dialog: true,
    spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
    tinydrive_demo_files_url: '../_images/tiny-drive-demo/demo_files.json',
    tinydrive_token_provider: (success, failure) => {
        success({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo' });
    },
    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
};

tinymce.init(demoBaseConfig);


alert.addEventListener('click', (e) => {
    e.target.remove();
})
