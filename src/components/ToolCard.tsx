import React from 'react';

interface ToolCardProps {
    id: string;
    name: string;
    description: string;
    Icon: React.FC;
    onClick: () => void;
}

export const ToolCard = ({ id, name, description, Icon, onClick }: ToolCardProps) => {
    return (
        <div className={`tool-card ${id}`} onClick={onClick}>
            <div className="tool-icon">
                <Icon />
            </div>
            <h3>{name}</h3>
            <p>{description}</p>
        </div>
    );
};
