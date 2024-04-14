<?php
namespace Espo\Modules\GracePack\Repositories;

use Espo\ORM\Entity;
use \PDO;

class Opportunity extends \Espo\Modules\Crm\Repositories\Opportunity
{
    /**
     * Use hooks instead.
     * @param array<string, mixed> $options
     * @return void
     */
    protected function beforeSave(Entity $entity, array $options = [])
    {
        parent::beforeSave($entity, $options);

        $selectQuery = $this->entityManager
            ->getQueryBuilder()
            ->select([
                ['service.sessions', 'sessions']
            ])
            ->from($this->entityType)
            ->where([
                'id' => $entity->get('id'),
            ])
            ->leftJoin(
                'OpportunityService',
                'opportunityService',
                [
                    'opportunityService.opportunityId:' => 'id',
                    'opportunityService.deleted' => 0
                ]
            )
            ->leftJoin(
                'Service',
                'service',
                [
                    'service.id:' => 'opportunityService.serviceId',
                    'service.deleted' => 0
                ]
            )
            ->build();
        
        $rows = $this->entityManager->getQueryExecutor()->execute($selectQuery)->fetchAll(PDO::FETCH_ASSOC);
        
        $trainingSessionTotal = 0;

        foreach ($rows as $row) {
            $trainingSessionTotal += $row['sessions'] ?? 0;
        }

        $entity->set('trainingSessionTotal', $trainingSessionTotal);
    }
}
