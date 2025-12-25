import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Server, Wifi, WifiOff, RefreshCw, Settings2, QrCode, Copy, Check } from 'lucide-react';
import { checkBackendHealth, getApiBaseUrl } from '@/lib/apiClient';
import { toast } from 'sonner';
import { QRCodeSVG } from 'qrcode.react';

export function ServerConfig() {
  const [testing, setTesting] = useState(false);
  const [open, setOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isConnected, setIsConnected] = useState(true);

  // Get the current app URL for QR code
  const getQrUrl = () => {
    if (typeof window === 'undefined') return '';
    return `${window.location.protocol}//${window.location.host}`;
  };
  
  const currentUrl = getQrUrl();

  const handleTestConnection = async () => {
    setTesting(true);
    try {
      const healthy = await checkBackendHealth();
      setIsConnected(healthy);
      if (healthy) {
        toast.success('Connected to Supabase!');
      } else {
        toast.error('Cannot connect to database');
      }
    } catch {
      setIsConnected(false);
      toast.error('Failed to connect to database');
    } finally {
      setTesting(false);
    }
  };

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      toast.success('URL copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy URL');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Server className="h-4 w-4" />
          {isConnected ? (
            <Badge variant="default" className="bg-green-500">Cloud</Badge>
          ) : (
            <Badge variant="destructive">Offline</Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="h-5 w-5" />
            Server Status
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* QR Code for sharing app URL */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-medium">
                <QrCode className="h-4 w-4" />
                Share App
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowQR(!showQR)}
              >
                {showQR ? 'Hide QR' : 'Show QR'}
              </Button>
            </div>
            
            {showQR && (
              <div className="flex flex-col items-center gap-3 p-4 bg-white rounded-lg border">
                <QRCodeSVG 
                  value={currentUrl} 
                  size={180}
                  level="M"
                  includeMargin
                />
                <div className="flex items-center gap-2 text-sm">
                  <code className="bg-muted px-2 py-1 rounded text-xs break-all">
                    {currentUrl}
                  </code>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-8 w-8"
                    onClick={handleCopyUrl}
                  >
                    {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground text-center">
                  Scan with another device to open this app.
                </p>
              </div>
            )}
          </div>

          {/* Connection Status */}
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                {isConnected ? (
                  <Wifi className="h-5 w-5 text-green-500" />
                ) : (
                  <WifiOff className="h-5 w-5 text-destructive" />
                )}
                <span className="font-medium">
                  {isConnected ? 'Connected to Cloud' : 'Disconnected'}
                </span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleTestConnection}
                disabled={testing}
              >
                <RefreshCw className={`h-4 w-4 ${testing ? 'animate-spin' : ''}`} />
              </Button>
            </div>

            <Button
              variant="outline"
              className="w-full"
              onClick={handleTestConnection}
              disabled={testing}
            >
              {testing ? 'Testing...' : 'Test Connection'}
            </Button>
          </div>

          {/* Info */}
          <div className="text-sm text-muted-foreground">
            <p>Backend: <code className="bg-muted px-1 rounded text-xs">{getApiBaseUrl() || 'Supabase'}</code></p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
