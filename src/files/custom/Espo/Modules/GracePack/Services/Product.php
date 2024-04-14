<?php
/*********************************************************************************
 * The contents of this file are subject to the EspoCRM Sales Pack
 * Agreement ("License") which can be viewed at
 * https://www.espocrm.com/sales-pack-agreement.
 * By installing or using this file, You have unconditionally agreed to the
 * terms and conditions of the License, and You may not use this file except in
 * compliance with the License.  Under the terms of the license, You shall not,
 * sublicense, resell, rent, lease, distribute, or otherwise  transfer rights
 * or usage to the software.
 *
 * Copyright (C) 2015-2022 Letrium Ltd.
 *
 * License ID: c921ec23d15465b7b29de33bd4e52c7a
 ***********************************************************************************/

namespace Espo\Modules\GracePack\Services;

use Espo\Core\Exceptions\Conflict;
use Espo\ORM\Entity;

class Product extends \Espo\Services\Record
{
    /**
     * @param TEntity $entity
     * @param stdClass $data
     * @return void
     */
    protected function beforeCreateEntity(Entity $entity, $data)
    {
        if ($entity->has('partNumber')) {
            $query = $this->entityManager
                ->getQueryBuilder()
                ->select(['id'])
                ->from('Product')
                ->where([
                    'partNumber' => $entity->get('partNumber')
                ])
                ->build();

                $rows = $this->entityManager
                    ->getQueryExecutor()
                    ->execute($query)
                    ->fetchAll();
                
            if (count($rows) > 0) {
                throw new Conflict('Duplicate product code!');
            }
        }
    }

    /**
     * @param TEntity $entity
     * @param stdClass $data
     * @return void
     */
    protected function beforeUpdateEntity(Entity $entity, $data)
    {
        if ($entity->has('partNumber')) {
            $query = $this->entityManager
                ->getQueryBuilder()
                ->select(['id'])
                ->from('Product')
                ->where([
                    'partNumber' => $entity->get('partNumber')
                ])
                ->build();

                $rows = $this->entityManager
                    ->getQueryExecutor()
                    ->execute($query)
                    ->fetchAll();
                
            if (count($rows) > 0) {
                throw new Conflict('Duplicate product code!');
            }
        }
    }
}
