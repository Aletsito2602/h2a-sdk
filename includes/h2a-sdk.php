<?php
/**
 * H2A Intercom SDK - PHP Helper Class
 * @version 2.0.0
 *
 * Nueva estructura: usa window.H2A_USER_DATA para pasar datos del usuario
 * y carga embed.js con data-embed-id.
 */

class H2A_SDK
{
    const VERSION = '2.0.0';
    const DEFAULT_SCRIPT_URL = 'https://h2aintercom.netlify.app/embed.js';
    const DEFAULT_BASE_URL = 'https://h2aintercom.netlify.app';

    private $embed_id;
    private $script_url;
    private $base_url;
    private $user_data = [];

    public function __construct(string $embed_id, ?string $script_url = null, ?string $base_url = null)
    {
        $this->embed_id = $embed_id;
        $this->script_url = $script_url ?? self::DEFAULT_SCRIPT_URL;
        $this->base_url = $base_url ?? self::DEFAULT_BASE_URL;
    }

    /**
     * Identificar usuario con los datos de sesión.
     *
     * @param array $userData Campos esperados: idu_w, email, is_logged, user_token
     */
    public function identify(array $userData): self
    {
        $allowed = ['idu_w', 'email', 'is_logged', 'user_token'];

        foreach ($userData as $key => $value) {
            if (in_array($key, $allowed)) {
                $this->user_data[$key] = $value;
            }
        }

        return $this;
    }

    /**
     * Renderiza el snippet: window.H2A_USER_DATA + script tag con data-embed-id.
     */
    public function render(bool $async = true): string
    {
        $asyncAttr = $async ? ' async' : '';

        // Construir H2A_USER_DATA con valores por defecto vacíos
        $data = [
            'idu_w'      => $this->user_data['idu_w'] ?? '',
            'email'      => $this->user_data['email'] ?? '',
            'is_logged'  => $this->user_data['is_logged'] ?? '',
            'user_token' => $this->user_data['user_token'] ?? '',
        ];

        $jsonFlags = JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP;

        // Generar cada propiedad con json_encode individual (igual que el snippet original)
        $idu_w      = json_encode($data['idu_w'], $jsonFlags);
        $email      = json_encode($data['email'], $jsonFlags);
        $is_logged  = json_encode($data['is_logged'], $jsonFlags);
        $user_token = json_encode($data['user_token'], $jsonFlags);

        $embedId   = htmlspecialchars($this->embed_id, ENT_QUOTES, 'UTF-8');
        $scriptUrl = htmlspecialchars($this->script_url, ENT_QUOTES, 'UTF-8');
        $baseUrl   = htmlspecialchars($this->base_url, ENT_QUOTES, 'UTF-8');

        return <<<HTML
<script>
  window.H2A_USER_DATA = {
    idu_w: {$idu_w},
    email: {$email},
    is_logged: {$is_logged},
    user_token: {$user_token},
  };
</script>
<script
  src="{$scriptUrl}"
  data-embed-id="{$embedId}"
  data-base-url="{$baseUrl}"
{$asyncAttr}></script>
HTML;
    }

    /**
     * Helper estático para uso rápido.
     */
    public static function widget(string $embed_id, array $user = [], ?string $script_url = null): string
    {
        $sdk = new self($embed_id, $script_url);
        if (!empty($user)) {
            $sdk->identify($user);
        }
        return $sdk->render();
    }
}

// Helper functions
function h2a_widget(string $embed_id, array $user = [], ?string $script_url = null): string
{
    return H2A_SDK::widget($embed_id, $user, $script_url);
}

function h2a(string $embed_id, ?string $script_url = null): H2A_SDK
{
    return new H2A_SDK($embed_id, $script_url);
}
