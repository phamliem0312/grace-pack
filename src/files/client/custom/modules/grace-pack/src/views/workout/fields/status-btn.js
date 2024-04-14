define('grace-pack:views/workout/fields/status-btn', ['view'], function(Dep) {
    return Dep.extend({
        template: "grace-pack:workout/fields/status-btn",

        data: function () {
            return {
                isDisabled: this.model.get('status') == 'Active' || this.model.get('status') == 'Rejected' ? true : false,
                label: this.model.get('status') == 'Active' ? 'Hoàn thành' : 'Chưa hoàn thành',
                status: this.model.get('status'),
            }  
        },

        events: {
            'change #changeStatus': function (e) {
                const status = $(e.currentTarget).val() ?? null;

                if (status == 'complete') {
                    Espo.Ajax.putRequest('/Workout/' + this.model.id, {
                        status: 'Active'
                    }).then(res => {
                        this.model.set('status', 'Active');
                        this.reRender();
                        Espo.Ui.notify("Saved", "success", 2000);
                    })
                }

                if (status == 'notComplete') {
                    const html = `<div class="cell col-sm-12 form-group" data-name="coachsReview" tabindex="-1" style="margin-top:24px;">
                            <label class="control-label" data-name="coachsReview"><span class="label-text">Ghi chú</span></label>
                            <div class="field" data-name="coachsReview">
                                <textarea class="main-element form-control auto-height" data-name="description" rows="2" autocomplete="espo-description" style="resize: none;" id="coachsReview"></textarea>
                            </div>
                        </div>`;
                    this.createView('dialog', 'views/modal', {
                        templateContent: html,
                        headerText: 'Cập nhật',
                        backdrop: true,
                        buttonList: [
                            {
                                name: 'save',
                                label: "Lưu",
                                onClick: () => {
                                    Espo.Ajax.putRequest('/Workout/' + this.model.id, {
                                        status: 'Rejected',
                                        coachsReview: $("#coachsReview").val()
                                    }).then(res => {
                                        this.model.set('status', 'Rejected');
                                        this.reRender();
                                        Espo.Ui.notify("Saved", "success", 2000);
                                        this.clearView('dialog');
                                    })
                                },
                                style: 'primary',
                            }
                        ],
                    }, view => {
                        view.render();
                    });
                }
            }
        }
    })
});