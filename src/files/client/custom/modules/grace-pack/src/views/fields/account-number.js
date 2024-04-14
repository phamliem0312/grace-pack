define('grace-pack:views/fields/account-number', ['views/fields/varchar', 'ui/select'],
function (Dep, Select) {
    return Dep.extend(/** @lends module:views/fields/phone.Class */{
        type: 'account-number',
        editTemplate: 'grace-pack:fields/account-number/edit',
        detailTemplate: 'grace-pack:fields/account-number/detail',
        listTemplate: 'grace-pack:fields/account-number/detail',
    });
});