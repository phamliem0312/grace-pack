define('grace-pack:views/lead/record/kanban', ['views/record/kanban'], function (Dep) {
    return Dep.extend({
        buildRow(i, model, callback) {
            const key = model.id;
            const rowActionsDisabled = model.get('status') == 'Converted' ? true : this.rowActionsDisabled;
    
            this.createView(key, this.itemViewName, {
                model: model,
                selector: '.item[data-id="'+model.id+'"]',
                itemLayout: this.listLayout,
                rowActionsDisabled: rowActionsDisabled,
                rowActionsView: this.rowActionsView,
                rowActionHandlers: this._rowActionHandlers || {},
                setViewBeforeCallback: this.options.skipBuildRows && !this.isRendered(),
                statusFieldIsEditable: this.statusFieldIsEditable,
                additionalRowActionList: this._additionalRowActionList,
                scope: this.scope,
            }, callback);
        },
        initSortable() {
            const $list = this.$groupColumnList;

            $list.find('> .item').on('touchstart', (e) => {
                e.originalEvent.stopPropagation();
            });

            const orderDisabled = this.orderDisabled;

            const $groupColumnList = this.$el.find('.group-column-list');

            const options = {
                distance: 10,
                connectWith: '.group-column-list',
                cancel: '.btn-group *',
                containment: this.getSelector(),
                scroll: false,
                over: function () {
                    $(this).addClass('drop-hover');
                },
                out: function () {
                    $(this).removeClass('drop-hover');
                },
                sort: (e) => {
                    if (!this.blockScrollControl) {
                        this.controlHorizontalScroll(e.originalEvent);
                    }
                },
                start: (e, ui) => {
                    $groupColumnList.addClass('drop-active');

                    $list.sortable('refreshPositions');

                    $(ui.item)
                        .find('.btn-group.open > .dropdown-toggle')
                        .parent()
                        .removeClass('open');

                    this.draggedGroupFrom = $(ui.item).closest('.group-column-list').data('name');
                    this.$showMore.addClass('hidden');

                    this.sortIsStarted = true;
                    this.sortWasCentered = false;

                    this.$draggable = ui.item;
                },
                stop: (e, ui) => {
                    this.blockScrollControl = false;
                    this.sortIsStarted = false;
                    this.$draggable = null;

                    const $item = $(ui.item);

                    this.$el.find('.group-column-list').removeClass('drop-active');

                    const group = $item.closest('.group-column-list').data('name');
                    const id = $item.data('id');

                    const draggedGroupFrom = this.draggedGroupFrom;

                    this.draggedGroupFrom = null;

                    this.$showMore.removeClass('hidden');

                    if (group !== draggedGroupFrom) {
                        const model = this.collection.get(id);

                        if (!model) {
                            $list.sortable('cancel');

                            return;
                        }

                        const attributes = {};

                        attributes[this.statusField] = group;

                        this.handleAttributesOnGroupChange(model, attributes, group);

                        $list.sortable('disable');

                        model
                            .save(attributes, {
                                patch: true,
                                isDrop: true,
                            })
                            .then(() => {
                                Espo.Ui.success(this.translate('Saved'));

                                $list.sortable('destroy');

                                this.initSortable();

                                this.moveModelBetweenGroupCollections(model, draggedGroupFrom, group);

                                if (!orderDisabled) {
                                    this.reOrderGroup(group);
                                    this.storeGroupOrder(group);
                                }

                                this.rebuildGroupDataList();
                            })
                            .catch(() => {
                                $list.sortable('cancel');
                                $list.sortable('enable');
                            });

                        return;
                    }

                    if (orderDisabled) {
                        $list.sortable('cancel');
                        $list.sortable('enable');

                        return;
                    }

                    this.reOrderGroup(group);
                    this.storeGroupOrder(group);
                    this.rebuildGroupDataList();
                },
            };

            for (let i = 0; i < $list.length; i++) {
                const element = $list[i];
                if ($(element).data().name == 'Converted') {
                    $(element).sortable({
                        disabled: true
                    });
                } else {
                    $(element).sortable(options);
                }
                $(element).sortable(options);
            }
        }
    });
});