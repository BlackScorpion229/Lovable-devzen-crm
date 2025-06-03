
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Operation } from '@/types';
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';
import { Clock, User, Truck, MapPin, Gauge, Fuel } from 'lucide-react';

interface OperationDetailsProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  operation: Operation | null;
  onEdit: () => void;
}

const OperationDetails = ({ open, onOpenChange, operation, onEdit }: OperationDetailsProps) => {
  if (!operation) return null;

  // Calculate operation duration if completed
  const calculateDuration = () => {
    if (!operation.endTime) return 'Em andamento';
    
    const start = new Date(`2023-01-01 ${operation.startTime}`);
    const end = new Date(`2023-01-01 ${operation.endTime}`);
    const diffMs = end.getTime() - start.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${diffHours}h ${diffMinutes}m`;
  };

  // Get status variant for badge
  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'active':
        return 'default';
      case 'completed':
        return 'secondary';
      default:
        return 'outline';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="text-xl">Operação {operation.id}</span>
            <Badge variant={getStatusVariant(operation.status)}>
              {operation.status === 'active' ? 'Ativa' : 'Concluída'}
            </Badge>
          </DialogTitle>
          <DialogDescription>
            Detalhes da operação em andamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Operador</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Nome:</span>
                <span className="ml-2 font-medium">{operation.operatorName}</span>
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">ID:</span>
                <span className="ml-2">{operation.operatorId}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Truck className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Empilhadeira</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Modelo:</span>
                <span className="ml-2 font-medium">{operation.forkliftModel}</span>
              </div>
              
              <div className="text-sm">
                <span className="text-muted-foreground">ID:</span>
                <span className="ml-2">{operation.forkliftId}</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Local</span>
            </div>
            
            <div className="text-sm">
              <span className="text-muted-foreground">Setor:</span>
              <span className="ml-2 font-medium">{operation.sector}</span>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Horários</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Início:</span>
                <span className="ml-2">{operation.startTime}</span>
              </div>
              
              {operation.endTime && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Fim:</span>
                  <span className="ml-2">{operation.endTime}</span>
                </div>
              )}
              
              <div className="text-sm">
                <span className="text-muted-foreground">Duração:</span>
                <span className="ml-2">{calculateDuration()}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 pt-2">
              <Gauge className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Horímetro</span>
            </div>
            
            <div className="space-y-2">
              <div className="text-sm">
                <span className="text-muted-foreground">Inicial:</span>
                <span className="ml-2">{operation.initialHourMeter.toLocaleString()}h</span>
              </div>
              
              {operation.currentHourMeter && (
                <div className="text-sm">
                  <span className="text-muted-foreground">Atual:</span>
                  <span className="ml-2">{operation.currentHourMeter.toLocaleString()}h</span>
                </div>
              )}
            </div>
            
            {operation.gasConsumption && (
              <>
                <div className="flex items-center gap-2 pt-2">
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Consumo</span>
                </div>
                
                <div className="text-sm">
                  <span className="text-muted-foreground">Gás:</span>
                  <span className="ml-2">{operation.gasConsumption} kg</span>
                </div>
              </>
            )}
          </div>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button onClick={onEdit}>
            Editar Operação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OperationDetails;
