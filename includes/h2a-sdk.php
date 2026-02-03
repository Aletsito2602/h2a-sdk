<?php
/**
 * H2A Intercom SDK - PHP Helper Class
 * @version 1.0.0
 */

class H2A_SDK
{
    const VERSION = '1.0.0';
    const DEFAULT_BASE_URL = 'https://h2aintercom.netlify.app';

    private $embed_id;
    private $base_url;
    private $config = [];
    private $user = [];
    private $secret_key;

    public function __construct(string $embed_id, ?string $base_url = null, ?string $secret_key = null)
    {
        $this->embed_id = $embed_id;
        $this->base_url = $base_url ?? self::DEFAULT_BASE_URL;
        $this->secret_key = $secret_key;
    }

    public function configure(array $config): self
    {
        $allowed = ['position', 'hide_launcher', 'custom_launcher', 'z_index', 'debug'];
        foreach ($config as $key => $value) {
            if (in_array($key, $allowed)) {
                $this->config[$key] = $value;
            }
        }
        return $this;
    }

    public function identify(array $userData): self
    {
        $standardFields = ['user_id', 'id', 'name', 'email', 'phone', 'company'];

        foreach ($userData as $key => $value) {
            if ($key === 'id') {
                $this->user['user_id'] = $this->sanitize($value);
            } elseif (in_array($key, $standardFields)) {
                $this->user[$key] = $this->sanitize($value);
            } else {
                $this->user[$key] = $this->sanitize($value);
            }
        }

        if ($this->secret_key && !empty($this->user['user_id'])) {
            $this->user['user_hash'] = $this->generateUserHash($this->user['user_id']);
        }

        return $this;
    }

    private function generateUserHash(string $user_id): string
    {
        return hash_hmac('sha256', $user_id, $this->secret_key);
    }

    private function sanitize($value)
    {
        if (is_string($value)) {
            return htmlspecialchars($value, ENT_QUOTES, 'UTF-8');
        }
        return $value;
    }

    private function buildSettings(): array
    {
        $settings = [
            'embed_id' => $this->embed_id,
            'base_url' => $this->base_url,
        ];

        foreach ($this->config as $key => $value) {
            $settings[$key] = $value;
        }

        foreach ($this->user as $key => $value) {
            if ($value !== null && $value !== '') {
                $settings[$key] = $value;
            }
        }

        return $settings;
    }

    public function render(bool $async = true): string
    {
        $settings = $this->buildSettings();
        $settingsJson = json_encode($settings, JSON_HEX_TAG | JSON_HEX_APOS | JSON_HEX_QUOT | JSON_HEX_AMP);
        $asyncAttr = $async ? ' async' : '';

        return <<<HTML
<script>window.h2aSettings={$settingsJson};</script>
<script src="{$this->base_url}/sdk.js"{$asyncAttr}></script>
HTML;
    }

    public static function widget(string $embed_id, array $user = [], array $config = []): string
    {
        $sdk = new self($embed_id);
        if (!empty($config))
            $sdk->configure($config);
        if (!empty($user))
            $sdk->identify($user);
        return $sdk->render();
    }
}

// Helper functions
function h2a_widget(string $embed_id, array $user = [], array $config = []): string
{
    return H2A_SDK::widget($embed_id, $user, $config);
}

function h2a(string $embed_id, ?string $base_url = null, ?string $secret_key = null): H2A_SDK
{
    return new H2A_SDK($embed_id, $base_url, $secret_key);
}
