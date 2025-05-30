
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';
import { useChatStore } from '@/store/chatStore';
import { useAgentStore } from '@/store/agentStore';
import { Download, FileText, Share, Copy } from 'lucide-react';

export const ExportOptions: React.FC = () => {
  const { getCurrentConversation } = useChatStore();
  const { getAgent } = useAgentStore();
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const conversation = getCurrentConversation();

  const generateConversationText = () => {
    if (!conversation) return '';

    let text = `NGX Agents - Conversación\n`;
    text += `Título: ${conversation.title}\n`;
    text += `Fecha: ${conversation.createdAt.toLocaleDateString()}\n`;
    text += `\n${'='.repeat(50)}\n\n`;

    conversation.messages.forEach((message, index) => {
      const agent = message.agentId ? getAgent(message.agentId) : null;
      const speaker = message.role === 'user' ? 'Tú' : (agent?.name || 'NGX Agent');
      
      text += `${speaker} [${message.timestamp.toLocaleTimeString()}]:\n`;
      text += `${message.content}\n\n`;
      
      if (index < conversation.messages.length - 1) {
        text += `${'-'.repeat(30)}\n\n`;
      }
    });

    return text;
  };

  const generateConversationHTML = () => {
    if (!conversation) return '';

    let html = `
<!DOCTYPE html>
<html>
<head>
    <title>NGX Agents - ${conversation.title}</title>
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; margin-bottom: 30px; }
        .message { margin-bottom: 20px; padding: 15px; border-radius: 8px; }
        .user { background-color: #f3f4f6; margin-left: 60px; }
        .assistant { background-color: #eff6ff; margin-right: 60px; }
        .speaker { font-weight: bold; margin-bottom: 8px; }
        .timestamp { font-size: 12px; color: #6b7280; margin-top: 8px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>NGX Agents - Conversación</h1>
        <p><strong>Título:</strong> ${conversation.title}</p>
        <p><strong>Fecha:</strong> ${conversation.createdAt.toLocaleDateString()}</p>
    </div>
`;

    conversation.messages.forEach((message) => {
      const agent = message.agentId ? getAgent(message.agentId) : null;
      const speaker = message.role === 'user' ? 'Tú' : (agent?.name || 'NGX Agent');
      const messageClass = message.role === 'user' ? 'user' : 'assistant';
      
      html += `
    <div class="message ${messageClass}">
        <div class="speaker">${speaker}</div>
        <div>${message.content.replace(/\n/g, '<br>')}</div>
        <div class="timestamp">${message.timestamp.toLocaleTimeString()}</div>
    </div>`;
    });

    html += `
</body>
</html>`;

    return html;
  };

  const exportAsTxt = () => {
    const text = generateConversationText();
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ngx-agents-${conversation?.title.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversación exportada",
      description: "La conversación se ha descargado como archivo de texto.",
    });
    setIsOpen(false);
  };

  const exportAsHTML = () => {
    const html = generateConversationHTML();
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ngx-agents-${conversation?.title.replace(/[^a-z0-9]/gi, '-')}-${Date.now()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Conversación exportada",
      description: "La conversación se ha descargado como archivo HTML.",
    });
    setIsOpen(false);
  };

  const copyToClipboard = async () => {
    const text = generateConversationText();
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copiado al portapapeles",
        description: "La conversación se ha copiado al portapapeles.",
      });
    } catch (err) {
      toast({
        title: "Error al copiar",
        description: "No se pudo copiar la conversación.",
        variant: "destructive",
      });
    }
    setIsOpen(false);
  };

  const shareConversation = async () => {
    const text = generateConversationText();
    if (navigator.share) {
      try {
        await navigator.share({
          title: `NGX Agents - ${conversation?.title}`,
          text: text,
        });
      } catch (err) {
        console.log('Error sharing:', err);
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
    setIsOpen(false);
  };

  if (!conversation || conversation.messages.length === 0) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-white/60 hover:text-white hover:bg-white/10"
        >
          <Download className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem onClick={exportAsTxt}>
          <FileText className="h-4 w-4 mr-2" />
          Exportar como TXT
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsHTML}>
          <Download className="h-4 w-4 mr-2" />
          Exportar como HTML
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={copyToClipboard}>
          <Copy className="h-4 w-4 mr-2" />
          Copiar al portapapeles
        </DropdownMenuItem>
        <DropdownMenuItem onClick={shareConversation}>
          <Share className="h-4 w-4 mr-2" />
          Compartir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
