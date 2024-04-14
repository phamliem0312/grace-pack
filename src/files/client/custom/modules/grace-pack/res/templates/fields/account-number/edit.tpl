<div class="field" data-name="phoneNumber">
    <div class="phone-number-block-container">
        {{#each accountNumberList}}
        <div class="input-group phone-number-block">
            <span class="input-group-item">
                <select data-property-type="type" class="form-control radius-left selectized" tabindex="-1"
                    style="display: none;">
                    <option value="{{type}}" selected="selected">{{type}}</option>
                </select>
                <div class="selectize-control form-control radius-left single plugin-espo_select">
                    <div class="selectize-input items has-options full has-items">
                        <div class="item" data-value="{{type}}">{{type}}</div><input type="text"
                            autocomplete="new-password" autofill="no" tabindex=""
                            style="width: 4px; opacity: 0; position: absolute; left: -10000px;">
                    </div>
                    <div class="selectize-dropdown single plugin-espo_select selectize-position-top"
                        style="display: none; visibility: visible; width: 200px; left: 0px; bottom: 35px; top: unset; margin: 0px;">
                        <div class="selectize-dropdown-content" tabindex="-1">
                            <div class="option {{#ifEqual type 'Vietcombank'}}selected{{/ifEqual}}" data-selectable="" data-value="Vietcombank">Vietcombank</div>
                            <div class="option {{#ifEqual type 'Techcombank'}}selected{{/ifEqual}}" data-selectable="" data-value="Techcombank">Techcombank</div>
                        </div>
                    </div>
                </div>
            </span>
            <span class="input-group-item input-group-item-middle">
                <input type="input" class="form-control phone-number no-margin-shifting" value=""
                    autocomplete="espo-accountNumber" maxlength="36" data-original-title="" title="">
            </span>
        </div>
        {{/each}}
    </div>

    <button class="btn btn-default btn-icon disabled" type="button" data-action="addAccountNumber"
        disabled="disabled"><span class="fa fa-plus"></span></button>

</div>