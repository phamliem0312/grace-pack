{{#if isDisabled}}
<span title="{{label}}" style="color:{{#ifEqual status 'Active'}}#00c500{{else}}#c50000{{/ifEqual}};">{{label}}</span>
{{else}}
<select class="form-control" id="changeStatus">
    <option value="">Chọn trạng thái</option>
    <option value="complete">Hoàn thành</option>
    <option value="notComplete">Không hoàn thành</option>
</select>
{{/if}}